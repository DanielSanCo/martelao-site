import { useState } from 'react';
import styles from './style.module.css'
import { useRouter } from 'next/router';
import Produtos from '@/util/produtos';

type Props = {
    img: string
}

const pageProd = ({ img }: Props) => {
    const { tenant, produto } = useRouter().query;

    // Converte produto para número (se for string e válido)
    const prodIndex = typeof produto === 'string' ? Number(produto) : -1;

    const prodInfo = Produtos[prodIndex];

    if (!prodInfo) {
        return <div>Produto inválido ou não encontrado.</div>;
    }

    return (
        <div className={styles.main}>
            <div className={styles.prodArea}>
                <div className={styles.imgArea}>
                    <img src={prodInfo.img} alt="" className={styles.img} />
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
                    <div className={styles.itemNome}>{prodInfo.codigo}</div>
                </div>
                <div className={styles.buyArea}>
                    <div>R$ {(prodInfo.preco * 0.8).toFixed(2)} pix</div><br/>
                    <div>R$ {(prodInfo.preco * 0.85).toFixed(2)} deb</div><br/>
                    <div>R$ {(prodInfo.preco * 0.9).toFixed(2)} cre</div>
                </div>
            </div>
        </div>
    )
}

export default pageProd;