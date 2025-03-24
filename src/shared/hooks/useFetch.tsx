// @ts-nocheck
import { useEffect, useReducer, useRef } from "react";

type Action<TResponse> =
  | { type: "loading" }
  | { type: "fetched"; payload: TResponse }
  | { type: "error"; payload: CustomError };

/**
 * Custom hook for fetching data using a service function.
 *
 * @template TResponse The type of the response data.
 * @template TPayload Optional type of the service payload.
 *
 * @param {ServiceFunction<TResponse, TPayload>} [serviceFunction] - The service function to call for fetching data.
 * @returns {FetchResponse<TResponse>} The loading state, error, and fetched data.
 *
 * @example
 * const { data, isLoading, error } = useFetch(() => fetchUsers());
 */

export function useFetch<TResponse, TPayload = void>(
  serviceFunction?: ServiceFunction<TResponse, TPayload> | null
): FetchResponse<TResponse> {
  // used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: FetchResponse<TResponse> = {
    error: undefined,
    data: undefined,
    isLoading: false,
  };

  // keeps state logic separated
  const fetchReducer = (
    state: FetchResponse<TResponse>,
    action: Action<TResponse>
  ): FetchResponse<TResponse> => {
    switch (action.type) {
      case "loading":
        return { ...initialState, isLoading: true };
      case "fetched":
        return { ...initialState, data: action.payload };
      case "error":
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!serviceFunction) {
      return;
    }

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: "loading" });

      try {
        const response = await serviceFunction();
        if (cancelRequest.current) return;

        if (!response.data && response.error) {
          dispatch({ type: "error", payload: response.error });
        } else if (response.data) {
          dispatch({ type: "fetched", payload: response.data });
        }
      } catch (error) {
        if (error instanceof Error) {
          if (cancelRequest.current) return;
          dispatch({
            type: "error",
            payload: {
              status: HttpServerErrorCode.INTERNAL_SERVER_ERROR,
              message: error.message,
              body: {},
            },
          });
        }
      }
    };

    fetchData();

    // use cleanup function to avoid future set states when components are not mounted
    // eslint-disable-next-line consistent-return
    return () => {
      cancelRequest.current = true;
    };
  }, [serviceFunction]);

  return state;
}
