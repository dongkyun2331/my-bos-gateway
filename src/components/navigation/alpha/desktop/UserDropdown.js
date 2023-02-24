import React, { useCallback } from "react";
import styled from "styled-components";
import { User } from "../../../icons/User";
import { LogOut } from "../../../icons/LogOut";
import { Withdraw } from "../../../icons/Withdraw";
import { NavLink } from "react-router-dom";
import { Widget, useNear, TGas, useAccount } from "near-social-vm";

const StyledDropdown = styled.div`
  button,
  a {
    font-weight: var(--font-weight-medium);
  }
  .dropdown-toggle {
    display: flex;
    align-items: center;
    text-align: left;
    background-color: var(--slate-dark-5);
    border-radius: 50px;
    outline: none;
    border: 0;
    padding: 6px;

    &:after {
      margin: 0 14px;
      border-color: var(--slate-dark-12);
      border-style: solid;
      border-width: 1.5px 1.5px 0 0;
      display: inline-block;
      width: 7px;
      height: 7px;
      transform: rotate(135deg);
    }

    > div {
      width: auto !important;
      height: auto !important;
    }

    img {
      border-radius: 50% !important;
      width: 28px !important;
      height: 28px !important;
    }
  }

  ul {
    background-color: var(--slate-dark-5);
    width: 100%;

    li {
      padding: 0 6px;
    }

    button,
    a {
      color: var(--slate-dark-11);
      display: flex;
      align-items: center;
      border-radius: 8px;
      padding: 12px;

      :hover,
      :focus {
        text-decoration: none;
        background-color: var(--slate-dark-1);
        color: white;

        svg {
          path {
            stroke: white;
          }
        }
      }

      svg {
        margin-right: 7px;
        min-width: 24px;
        path {
          stroke: var(--slate-dark-9);
        }
      }
    }
  }
`;

export function UserDropdown(props) {
  const near = useNear();
  const account = useAccount();

  const withdrawStorage = useCallback(async () => {
    await near.contract.storage_withdraw({}, TGas.mul(30).toFixed(0), "1");
  }, [near]);

  return (
    <>
      <StyledDropdown className="dropdown" onMouseEnter={props.onMouseEnter}>
        <button
          className="dropdown-toggle"
          type="button"
          id="dropdownMenu2222"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Widget
            src={props.widgets.profileImage}
            props={{
              accountId: account.accountId,
              className: "d-inline-block",
            }}
          />
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenu2222"
          style={{ minWidth: "fit-content" }}
        >
          <li>
            <NavLink
              className="dropdown-item"
              type="button"
              to={`/calebjacob.near/widget/ProfilePage?accountId=${account.accountId}`}
            >
              <User />
              My Profile
            </NavLink>
          </li>
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => withdrawStorage()}
            >
              <Withdraw />
              Withdraw {props.availableStorage.div(1000).toFixed(2)}kb
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => props.logOut()}
            >
              <LogOut />
              Sign Out
            </button>
          </li>
        </ul>
      </StyledDropdown>
    </>
  );
}