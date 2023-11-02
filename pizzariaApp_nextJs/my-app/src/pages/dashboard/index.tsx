import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';
import styles from './styles.module.scss';


import { Header } from '../../components/Header';
import { FiRefreshCcw } from 'react-icons/fi';
import { toast } from 'react-toastify';

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
    const [orders,setOrders] = useState( props.orders || []);
    const [modalItem,setModalItem] = useState<OrderItemProps[]>();
    const [modalVisible,setModalVisible] = useState(false);

    async function handleRefreshOrders(){
      const api = setupAPIClient();
      const response = await api.get('/orders');
      setOrders(response.data);
    }

    async function handleFinishButton(id: string){
      const api = setupAPIClient();
      
      try {
        await api.put('/order/finish',{order_id:id});
        
        toast.success('Pedido Finalizado com Sucesso!');

        const response = await api.get('/orders');
        setOrders(response.data);
        setModalVisible(false);

      }catch(err){
        console.log(err);
        toast.error('Erro ao Finalizar pedido');
      }
    }
    
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
                <button onClick={ handleRefreshOrders}>
                  <FiRefreshCcw size={25} color='#3fffa3'/>
                </button>
              </div>

              <article className={styles.listOrders}>

                { orders.length === 0 && 
                  <span className={styles.ordersNotFound}>Nenhum pedido aberto encontrado...</span>
                }

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
            <ModalOrder 
              isOpen={modalVisible}
              onRequestClose={handleModalClose}
              order={modalItem}
              handleFinishButton={handleFinishButton}
            />
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
