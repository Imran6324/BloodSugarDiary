import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBtn, CDBIcon} from 'cdbreact';
import styled from 'styled-components'
import { CDBBox } from 'cdbreact';
import { logo } from '../../assets';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
export const Footer = () => {
  return (
    <FooterCom>
    <CDBFooter fixed='bottom' className="shadow">
      <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%' }}>
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox alignSelf="center">
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <img alt="logo" src={logo} width="30px" />
              <span className="ml-3 h5 font-weight-bold">Blood Sugar Diary</span>
            </a>
            <CDBBox className="mt-5" display="flex">
              <CDBBtn flat color="dark" className="p-2">
                <CDBIcon fab icon="facebook-f" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="mx-3 p-2">
                <CDBIcon fab icon="twitter" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="p-2">
                <CDBIcon fab icon="instagram" />
              </CDBBtn>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              More
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
              <CDBFooterLink href="/">Resources</CDBFooterLink>
              <CDBFooterLink href="/">About Us</CDBFooterLink>
              <CDBFooterLink href="/">Contact</CDBFooterLink>
              <CDBFooterLink href="/">Blog</CDBFooterLink>
            </CDBBox>
          </CDBBox>
          {/* <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Functions
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
              <CDBFooterLink href="/">Add direct reading</CDBFooterLink>
              <CDBFooterLink href="/">View records</CDBFooterLink>
              <CDBFooterLink href="/">Graphs</CDBFooterLink>
            </CDBBox>
          </CDBBox> */}
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Help
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
              <CDBFooterLink href="/">Support</CDBFooterLink>
              <CDBFooterLink href="/">Sign Up</CDBFooterLink>
              <CDBFooterLink href="/">Sign In</CDBFooterLink>
            </CDBBox>
          </CDBBox>

          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Subscribe
            </p>
            <CDBBox display="flex" flex="column" style={{ cursor: 'pointer' }}>
            <InputGroup className="mb-3">
              <Form.Control
                  type="email" 
                placeholder="email"
                aria-label="email"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                Subscribe
              </Button>
            </InputGroup>
            </CDBBox>
          </CDBBox>




        </CDBBox>
        <small className="text-center mt-5">&copy; <a style={{color:'black'}} href="https://www.linkedin.com/in/khan38imran/" target="_blank" rel="noopener noreferrer"> 
          Imran</a> , 2023. All rights reserved.</small>
      </CDBBox>
    </CDBFooter>
    </FooterCom>
  );
};
export default Footer

const FooterCom = styled.div`
/* position: fixed;
    width: -webkit-fill-available;
    bottom: 0; */
    width: -webkit-fill-available;
a{
    text-decoration: none !important;
}`