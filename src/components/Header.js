import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { connect } from "../redux/blockchain/blockchainActions";

import { PageHeader, Button, Input, Space, Badge } from 'antd';
import { useMoralis } from "react-moralis";
import { Link } from 'react-router-dom';
import './Header.css'
import Amazon from "../images/logo.png";
import USA from "../images/usa.png";
import BookStore from "../images/bookstore.png";
import {ShoppingCartOutlined, MenuOutlined} from "@ant-design/icons";
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { useContractRead } from 'wagmi';

import contractInterface from "../config/abi.json";

const {Search } = Input;
const categories = ["Comics", "Dictionaries", "Novels", "Fantasy", "Horror", "Adventure"];

const Header = () => {

  const { data: getBNBPrice } = useContractRead(
    {
      addressOrName: '0x061c71d458fA8dAcDAca3624A50AAE51aA24c655',
      contractInterface: contractInterface,
    },
    'getBNBPrice',
  );

  const { authenticate, account } = useMoralis();
  const getPrice = () => {
    const bnb_price = getBNBPrice/100000000;
    console.log("getBNBPrice", bnb_price);
    
    window.alert("BNB Price: " + bnb_price);
  }

  return(
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        extra={[
          <>
          <img src={Amazon} className="logo"></img>
          <img src={BookStore} className="logo"></img>
          <Search
              placeholder="Find A Product"
              enterButton
              className = "searchBar"
            />
         <Button 
         className="login"
         key="1" 
         type="primary" 
         onClick={() => authenticate()}>
          {account ? <span>{account.slice(0,5)}...</span> : <span>login</span>}
          </Button>
          {/* {
            blockchain.account !== null ?
            <Button
            className='wallet'
              onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
              }}
            >
              CONNECTED
            </Button> :
            <Button
            className='wallet'
              onClick={(e) => {
                e.preventDefault();
                dispatch(connect());
              }}
            >
              WALLET CONNECT
            </Button>
          } */}
          <button className="connect-wallet">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button onClick={openConnectModal} type="button" className="connectBtn">
                            Connect Wallet
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} type="button" className="wrongBtn">
                            Wrong network
                          </button>
                        );
                      }
                      return (
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button onClick={openAccountModal} type="button" className="walletBtn">
                            {account.displayName}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </button>
          
          
          <Space size={"large"}>
              
              <Badge count={0} showZero>
                <span className="header-buttons">
                  <ShoppingCartOutlined className="header-icon" />
                  Cart
                </span>
              </Badge>
              <Space className="header-buttons" size={"small"}>
                <img src={USA} alt="region" className="flag"></img>▾
              </Space>
              
            </Space>
          </>
        ]}>
      </PageHeader>
      <div className="site-page-subheader-ghost-wrapper">
      <Space size={"middle"}>
        <Space size={"small"} style={{fontWeight:"bold"}}>
          <MenuOutlined />
          Categories
        </Space>
        {categories.map((e) =>{
          return(
            <Link to="/categories" state={e} className="categories">
              {e}
            </Link>
          )

        })}
        <Link to="" className="categories" onClick={() => getPrice()}>
          Get BNB price
        </Link>
      </Space>
    </div>
    </div>
  )
}

export default Header;