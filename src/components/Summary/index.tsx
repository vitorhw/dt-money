import { Container } from "./styles";
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

export function Summary() {

  const { transactions } = useTransactions();

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;


  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,
  })

  return(
    <Container>

      <div>
        <header>
          <p>In</p>
          <img src={incomeImg} alt="in"/>
        </header>

        <strong>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Out</p>
          <img src={outcomeImg} alt="out"/>
        </header>

        <strong>
          -{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdraws)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total"/>
        </header>

        <strong>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}