import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AppDispatch } from '../redux/store';
import { AboutPayment } from '../types/paymentTypes'
import { updatePaymentStatus } from '../redux/actions/paymentActions';

export const startConnection = (dispatch: AppDispatch): HubConnection => {
  const connection: HubConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:5002/paymentHub")
    .build();

  connection.start().catch(err => console.error('Error while establishing connection:', err));

  connection.on("ReceivePaymentStatus", (paymentStatus: AboutPayment) => {
    dispatch(updatePaymentStatus(paymentStatus));
  });

  return connection;
};
