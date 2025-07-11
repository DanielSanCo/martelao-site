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

  if (!router.isReady) return <div>Carregando...</div>;

  const nomeProduto = typeof produto === 'string' ? decodeURIComponent(produto) : '';
  const prodInfo = Produtos.find(p => p.nome === nomeProduto);

  if (!prodInfo) {
    return <div>Produto inválido ou não encontrado: {nomeProduto}</div>;
  }

  const handleCorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cor = prodInfo.cores?.find(c => c.nome === e.target.value);
    if (cor) {
      setCorSelecionada(cor.nome);
      setPrecoSelecionado(cor.preco);
      setCodigoSelecionado(cor.codigo);
    }
  };

  const precoBase = precoSelecionado ?? prodInfo.preco;

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
          <div className={styles.itemNome}>Código: {codigoSelecionado || prodInfo.codigo}</div>
        </div>

        <div className={styles.buyArea}>
          <div>
            <label htmlFor="cor">Cor:</label>
            <select
              id="cor"
              className={styles.input}
              defaultValue=""
              onChange={handleCorChange}
            >
              <option value="" disabled>Selecione uma cor</option>
              {prodInfo.cores?.map((item, index) => (
                <option key={item.codigo || index} value={item.nome}>
                  {item.nome}
                </option>
              ))}
            </select>

            {corSelecionada && (
              <div style={{ marginTop: '5px', fontSize: '12px', marginBottom: '10px' }}>
                Cor selecionada: <strong>{corSelecionada}</strong><br />
                Preço base: <strong>R$ {precoBase.toFixed(2)}</strong>
              </div>
            )}
          </div>

          <div>R$ {(precoBase * 0.8).toFixed(2)} pix</div>
          <br />
          <div>R$ {(precoBase * 0.85).toFixed(2)} débito</div>
          <br />
          <div>R$ {(precoBase * 0.9).toFixed(2)} crédito</div>
        </div>
      </div>
    </div>
  );
};

export default PageProd;
