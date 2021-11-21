import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <span>
                © 2020 All Rights Reserved
                <a href="http://www.arielbehar.com">
                    Ariel Behar
                    <img src="/img/arielbehar-logo.png" alt="Ariel Behar Logo" />
                </a>
            </span>
        </footer>
    );
};

export default Footer;
