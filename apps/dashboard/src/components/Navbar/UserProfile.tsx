// Imports
// React Imports
import { useState } from "react";

// Styles & CSS
import styled from "styled-components";

// Utils
import { ProfileImg } from "../ProfileImg";

// Types
import { CurrentUser } from "../../utils/types";
import Link from "next/link";

const UserWrapper = styled.div`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.text.main};
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    filter: opacity(0.8);
  }
`;

const IconImg = styled.div`
  position: relative;
  --icon-size: 2.5rem;
  width: var(--icon-size);
  height: var(--icon-size);
  background-color: #484a4d;
  border-radius: 50%;
  margin-right: 0.875rem;

  img {
    border-radius: 50%;
  }
`;

type userProfileTypes = {
  user: CurrentUser;
};

const UserProfile = ({ user }: userProfileTypes) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <UserWrapper>
        <UserContainer onClick={() => setOpen(!open)}>
          <IconImg>{ProfileImg(user)}</IconImg>
          <strong>{user.username}</strong>
          &nbsp;
          {/* <p>#{user.discriminator}</p> */}
        </UserContainer>
        {open && <DropdownMenu />}
      </UserWrapper>
    </>
  );
};

const DropdownMenu = () => {
  const logout = () => {
    window.location.assign("http://localhost:3001/api/auth/logout");
  };

  return (
    <>
      <DropDown>
        <h3>DropDown Menu</h3>
        <div className="logoutButton">
          <hr />
          <Link href="http://localhost:3001/api/auth/logout" passHref>
            <a
            // onClick={(e) => {
            //   logout();
            // }}
            >
              Log Out
            </a>
          </Link>
        </div>
      </DropDown>
    </>
  );
};

const DropDown = styled.div`
  position: absolute;
  top: 3.75rem;
  min-width: 10rem;
  transform: translateX(-45%);
  background-color: ${({ theme }) => theme.base.main};
  border: 1px solid #36383a;
  border-radius: 8px;
  padding: 1rem;
  overflow: hidden;
  transition: height var(--nav-size) ease;

  z-index: 999;

  .logoutButton {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    a {
      padding-top: 0.5rem;
      text-decoration: none;
      color: ${({ theme }) => theme.text.main};
    }
  }
`;

export default UserProfile;
