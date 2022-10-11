const connectRequest = () => {
    return {
      type: "CONNECTION_REQUEST",
    };
  };
  
  const connectSuccess = (payload) => {
    return {
      type: "CONNECTION_SUCCESS",
      payload: payload,
    };
  };
  
  const connectFailed = (payload) => {
    return {
      type: "CONNECTION_FAILED",
      payload: payload,
    };
  };
  
  const updateAccountRequest = (payload) => {
    return {
      type: "UPDATE_ACCOUNT",
      payload: payload,
    };
  };
  
  export const connect = () => {
    return async (dispatch) => {
      dispatch(connectRequest());
      const configResponse = await fetch("/config/config.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const CONFIG = await configResponse.json();
      const { ethereum } = window;
      const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
      if (metamaskIsInstalled) {
        try {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log(accounts)
          const networkId = await ethereum.request({
            method: "net_version",
          });
          if (networkId == CONFIG.NETWORK.ID) {
            dispatch(
                connectSuccess({
                    account: accounts[0]
                })
            );
            ethereum.on("accountsChanged", (accounts) => {
              dispatch(updateAccount(accounts[0]));
            });
            ethereum.on("chainChanged", () => {
              window.location.reload();
            });
            // Add listeners end
          } else {
            dispatch(connectFailed(`Change network to ${CONFIG.NETWORK.NAME}.`));
          }
        } catch (err) {
          dispatch(connectFailed("Something went wrong."));
        }
      } else {
        dispatch(connectFailed("Install Metamask."));
      }
    };
  };
  
  export const updateAccount = (account) => {
    return async (dispatch) => {
      dispatch(updateAccountRequest({ account: account }));
    };
  };
  