import { useRouter } from 'next/router';
import Produtos from '@/util/produtos';
import styles from './style.module.css';

const PageProd = () => {
  const router = useRouter();
  const { produto } = router.query;

  if (!router.isReady) return <div>Carregando...</div>;

  // Decodifica o parâmetro e busca o produto pelo nome
  const nomeProduto = typeof produto === 'string' ? decodeURIComponent(produto) : '';

  const prodInfo = Produtos.find(p => p.nome === nomeProduto);

  if (!prodInfo) {
    return <div>Produto inválido ou não encontrado: {nomeProduto}</div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.prodArea}>
        <div className={styles.imgArea}>
          <img src={prodInfo.img} alt={prodInfo.nome} className={styles.img} />
          <div className={styles.miniImgs}>
            <div className={styles.img1}>
              <img src="/img/test9.jpg" alt="" className={styles.miniImg} />
            </div>
            <div className={styles.img2}>
              <img src="/img/test4.png" alt="" className={styles.miniImg} />
            </div>
            <div className={styles.img3}>
              <img src="/img/test7.png" alt="" className={styles.miniImg} />
            </div>
          </div>
        </div>
        <div className={styles.infoProd}>
          <div className={styles.itemNome}>{prodInfo.nome}</div>
          <div className={styles.itemNome}>Código: {prodInfo.codigo}</div>
        </div>
        <div className={styles.buyArea}>
          <div>R$ {(prodInfo.preco * 0.8).toFixed(2)} pix</div>
          <br />
          <div>R$ {(prodInfo.preco * 0.85).toFixed(2)} débito</div>
          <br />
          <div>R$ {(prodInfo.preco * 0.9).toFixed(2)} crédito</div>
        </div>
      </div>
    </div>
  );
};

export default PageProd;
