import type { Ticket } from './definitions';

export const fetchTickets = async (): Promise<Ticket[]> => {
  const response = await import('./tickets.json');
  return response.tickets.sort((a: Ticket, b: Ticket) => a.price - b.price);
};
