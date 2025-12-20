import Banner from '@/components/Banner';
import styles from '../styles/Home.module.css'
import Produtos from '@/util/produtos';
import Produto from '@/components/Produto';

const Home = () => {
  return (
    <div className={styles.home}>
        <div className={styles.main}>
            <div className={styles.space}></div>
            <div className={styles.produtos}>
                {Produtos.map((item, index) => (
                    <Produto
                        key={index}
                        img={item.img}
                        nome={item.nome}
                        codigo={item.codigo}
                        preco={
                            typeof item.price === "number"
                                ? item.price
                                : Number(item.price)
                        }
                    />
                ))}
            </div>
            <div className={styles.space}></div>
        </div>
    </div>
  )
}

export default Home;