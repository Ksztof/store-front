import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { AppDispatch } from '../redux/store';
import { AboutPayment } from '../types/paymentTypes'
import { updatePaymentStatus } from '../redux/actions/paymentActions';

export const startConnection = (dispatch: AppDispatch, orderId: number): HubConnection => {
  const connection: HubConnection = new HubConnectionBuilder()
    .withUrl("https://store-api-hqf7djgufnhmamgp.polandcentral-01.azurewebsites.net/paymentHub")
    .build();

  connection.start()
    .then(() => {
      return connection.invoke('JoinGroup', orderId.toString());
    })
    .catch(err => console.error('Error while establishing connection:', err));

  connection.on("ReceivePaymentStatus", (paymentStatus: AboutPayment) => {
    dispatch(updatePaymentStatus(paymentStatus));
  });

  return connection;
};
