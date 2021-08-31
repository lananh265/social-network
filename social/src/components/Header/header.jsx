
import React from 'react';
import {NavLink} from 'react-router-dom';
import { Collapse, Container, Row } from 'reactstrap';
import './Header.scss';

Header.propTypes = {};

function Header(){
    return (
        <header className="header">
            <Container>
                <Row className="justify-content-between">
                    <Col xs="auto">
                        <a
                        className="header__link headertitle"
                        href="dangki.js">Đăng Kí</a>
                    </Col>

                    <Col xs="auto">
                        <NavLink
                        exact
                        className="header__link"
                        to="/photos"
                        activeClassName="header__link--active">Đăng Nhập</NavLink>
                        
                    </Col>
                </Row>
            </Container>
        </header>
    )
}
export default Header;