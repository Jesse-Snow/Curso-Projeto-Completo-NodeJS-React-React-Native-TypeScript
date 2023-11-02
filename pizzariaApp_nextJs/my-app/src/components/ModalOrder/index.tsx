import Modal from 'react-modal';

import { OrderItemProps } from '../../pages/dashboard';

import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

interface ModalOrderProps { 
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishButton: (id: string) => void;
}


export function ModalOrder( props: ModalOrderProps ){

    const customStyles = { 
      content:{
        top:'50%',
        botton:'auto',
        left:'50%',
        right:'auto',
        padding:'30px',
        transform: 'translate(-50%,-50%)',
        backgroundColor: '#1d1d2e',
        overflow:'hidden',
        minHeight:'350px'
      }
    }

    return (
        <Modal
          isOpen={props.isOpen}
          onRequestClose={props.onRequestClose}
          style={customStyles}
        >
          <button
            onClick={props.onRequestClose}
            className='react-modal-close'
            style={{background:'transparent', border:0}}
          >
            <FiX size={45} color='#f34748' />
          </button>

          <div className={styles.container}>

            <h2>Detalhes do Pedido</h2>
              { props.order[0] ? 
                (<span className={styles.table}>
                  Mesa: <strong>{ props.order[0].order.table}</strong>
                </span>) :
                (
                  <span>Mesa sem Pedido <br/><br/></span>
                ) 
              }

            {props.order.map( value => {
              return ( 
                <section key={value.id} className={styles.containerItem}>
                  <span>{value.amount} - <strong>{value.product.name}</strong></span>
                  <span>{value.product.description}</span>
                </section>
              )
            })}

            { props.order[0] && 
              <button className={styles.buttonOrder} onClick={() => props.handleFinishButton(props.order[0].order_id)}>
                Concluir Pedido
              </button>
            }

          </div>

        </Modal>
    )
}