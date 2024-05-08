import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const isGuestUser = (): boolean =>
    !!cookies.get('GuestSessionId');
