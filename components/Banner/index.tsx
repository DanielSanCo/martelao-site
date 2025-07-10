import styles from './style.module.css'

const Banner = () => {
    return (
        <div className={styles.banner}>
            <img src='/img/martelaoLogo.png' alt="" className={styles.logo} />
        </div>
    )
}

export default Banner;