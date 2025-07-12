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

  const handleCorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cor = prodInfo.opcoes?.find(c => c.nome === e.target.value);
    if (cor) {
      setCorSelecionada(cor.nome);
      setPrecoSelecionado(cor.preco);
      setCodigoSelecionado(cor.codigo);
    }
  };

  const precoBase = precoSelecionado ?? prodInfo.preco;

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
          <div className={styles.itemNome}>
            Código:{" "}
            <div onClick={copiarTexto} style={{ cursor: 'pointer', display: 'inline', color: 'blue' }}>
              {codigoSelecionado || prodInfo.codigo}
              {copiado && <span style={{ color: 'green', marginLeft: 5 }}>✔ Copiado!</span>}
            </div>
          </div>
        </div>

        <div className={styles.buyArea}>
          <div>
            <label htmlFor="cor">opção:</label>
            <select
              id="cor"
              className={styles.input}
              defaultValue=""
              onChange={handleCorChange}
            >
              <option value="" disabled>Selecione...</option>
              {prodInfo.opcoes?.map((item, index) => (
                <>
                    <option key={item.codigo || index} value={item.nome}>
                      {item.nome}
                    </option>
                </>
              ))}

            </select>

            {corSelecionada && (
              <div style={{ marginTop: '5px', fontSize: '12px', marginBottom: '10px' }}>
                opção selecionada: <strong>{corSelecionada}</strong><br />
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
