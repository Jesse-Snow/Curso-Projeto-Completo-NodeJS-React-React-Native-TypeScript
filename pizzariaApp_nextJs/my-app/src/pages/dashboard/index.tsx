import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';
import styles from './styles.module.scss';


import { Header } from '../../components/Header';
import { FiRefreshCcw } from 'react-icons/fi';

import { setupAPIClient } from '../../services/api';

import { useState } from 'react';

import Modal from 'react-modal';

import { ModalOrder } from '../../components/ModalOrder';

interface OrdersProps { 
  id:string;
  table: number | string;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface DashboardProps {
  orders: OrdersProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  product_id: string;
  order_id: string;
  product: { 
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
  }
  order: { 
    id: string;
    table: number | string;
    status:boolean;
    name: string | null;
  }


}


export default function Dashboard( props : DashboardProps ){
    const [orders] = useState( props.orders || []);
    const [modalItem,setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible,setModalVisible] = useState(false);

    function handleModalClose(){
      setModalVisible(false);
    }

    async function handleOpenModalView(id: string){
      const api = setupAPIClient();

      const response = await api.get('/order/detail', {
        params: { 
          order_id: id
        }
      })

      setModalItem(response.data);
      setModalVisible(true);

      
    }

    Modal.setAppElement('#__next');
    return (
        <>
          <Head>
            <title>Painel - Sujeito Pizzaria</title>
          </Head>
          <div>
          <Header />
            <main className={styles.container}>

              <div className={styles.containerHeader}>
                <h1>Últimos Pedidos</h1>
                <button>
                  <FiRefreshCcw size={25} color='#3fffa3'/>
                </button>
              </div>

              <article className={styles.listOrders}>

                {
                  orders.map( value => { 
                    return (
                      <section key={value.id} className={styles.orderItem} >
                        <button onClick={() => handleOpenModalView(value.id)}>
                          <div className={styles.tag}></div>
                          <span>Mesa {value.table}</span>
                        </button>
                      </section>

                    )
                  })
                }

              </article>
            </main>
          </div>

          { modalVisible && 
            <ModalOrder />
          }
        </>
    );
}

export const getServerSideProps = canSSRAuth( async (ctx) => {
    const api = setupAPIClient(ctx);

    const response = await api.get('/orders');

    return { 
        props:{ orders: response.data }
    }
});
