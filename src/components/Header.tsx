import React from "react";
import styled from "styled-components";
import { black, white } from "./../styles/ts/colors";
import Link from "next/link";

const Container = styled.header`
  background-color: ${black};
  a {
    color: ${white};
    text-decoration: none;
  }
  a:link {
    color: ${white};
  }
  a:visited {
    color: ${white};
  }
  a:hover {
    color: ${white};

    opacity: 0.8;
  }
  a:active {
    opacity: 0.6;
  }
  padding: 1rem;
  .menu {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr 1fr;
    align-items: center;
    grid-gap: 1rem;
    padding {
      top: 1rem;
    }
    .logo {
      font-weight: bold;
    }
    .search {
      background-color: ${white};
      input {
        width: 100%;
        border: none;
        padding: 0.3rem;
      }
    }
  }

  .globalNavigation {
    ul {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }
    li {
      padding: 1rem;
      font-weight: 600;
      border-bottom: 2px solid #ffffff;

      :hover {
        opacity: 0.8;
      }
      :active {
        opacity: 0.6;
      }
    }
  }
`;

const Header: React.FunctionComponent = props => {
  return (
    <Container className="header">
      <div className="menu">
        <a href="/" className="logo">
          PC Asset Store
        </a>
        <nav className="globalNavigation">
          <ul>
            <li>
              <Link href="/upload">
                <a>Upload</a>
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </Container>
  );
}
export default Header;
