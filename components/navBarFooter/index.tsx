import styles from './style.module.css'

const navList = [
    { nome: 'Canos', link: '/Canos' },
    { nome: 'Banheiro', link: '/Banheiro' },
    { nome: 'Elétrica', link: '/Eletrica' },
    { nome: 'Construção', link: '/Construcao' },
]

const NavBarFooter = () => {
    return (
        <div className={styles.nav}>
            {navList.map((item, index) => (
                <a href={item.link} key={index}>
                    <div key={index} className={styles.eachItem}>{item.nome}</div>
                </a>
            ))}
        </div>
    )
}

export default NavBarFooter;