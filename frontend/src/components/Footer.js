function Footer(props) {
return (
    <footer className="footer">
        {props.loggedIn && <p className="footer__logo">&copy; {(new Date()).getFullYear()} Mesto Russia</p>}
        </footer>
);
}

export default Footer;