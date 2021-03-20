import { Container, RadioBox } from './styles';
import { TransactionTypeContainer } from './styles';
import Modal from 'react-modal';
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface newTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: newTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type
    })

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit');
    onRequestClose();


  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close">
        <img src={closeImg} alt="Close Modal"/>
      </button>

      <Container 
        onSubmit={handleCreateNewTransaction}
      >

        <h2>New transaction</h2>

        <input
          placeholder="Name"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          placeholder="Value"
          type="number"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>

          <RadioBox 
            type="button"
            onClick={() => { setType('deposit'); }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="income"/>
            <span>Credit</span>
          </RadioBox>

          <RadioBox 
            type="button"
            onClick={() => { setType('withdraw'); }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="outocome"/>
            <span>Debit</span>
          </RadioBox>

        </TransactionTypeContainer>

        <input
          placeholder="Category"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />
        
        <button type="submit">
          Submit
        </button>

      </Container>

    </Modal>
  );
}