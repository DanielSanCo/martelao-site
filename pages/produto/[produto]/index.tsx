import { useState } from 'react';
import { useRouter } from 'next/router';
import Produtos from '@/util/produtos';
import styles from './style.module.css';

const PageProd = () => {
  const router = useRouter();
  const { produto } = router.query;
  const [corSelecionada, setCorSelecionada] = useState('');
  const [precoSelecionado, setPrecoSelecionado] = useState<number | null>(null);
  const [codigoSelecionado, setCodigoSelecionado] = useState('');
  const [copiado, setCopiado] = useState(false);

  if (!router.isReady) return <div>Carregando...</div>;

  const nomeProduto = typeof produto === 'string' ? decodeURIComponent(produto) : '';
  const prodInfo = Produtos.find(p => p.nome === nomeProduto);

  if (!prodInfo) {
    return <div>Produto inválido ou não encontrado: {nomeProduto}</div>;
  }

  const copiarTexto = async () => {
    try {
      await navigator.clipboard.writeText(codigoSelecionado || prodInfo.codigo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000); // remove aviso após 2s
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

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
          <div style={{padding: '20px'}}>{prodInfo.infos}</div>
          <div className={styles.itemNome}>
            Código:{" "}
            <div onClick={copiarTexto} style={{ cursor: 'pointer', display: 'inline', color: 'blue' }}>
              {codigoSelecionado || prodInfo.codigo}
              {copiado && <span style={{ color: 'green', marginLeft: 5 }}>✔ Copiado!</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageProd;
