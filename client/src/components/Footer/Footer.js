import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <footer className={styles.footerCustomStyles}>
            <span>
                © 2021 All Rights Reserved
                <a href="http://www.arielbehar.com">
                    Ariel Behar
                    <img src="/img/arielbehar-logo.png" alt="Ariel Behar Logo" />
                </a>
            </span>
        </footer>
    );
};

export default Footer;
