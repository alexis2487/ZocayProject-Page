/**
 * Zocay Project — Configuración Central de Pasarelas de Pago
 * - Wompi Bancolombia (Colombia: PSE, Nequi, Bancolombia, Tarjetas COP)
 * - PayPal (Donantes y Compradores Internacionales: USD, EUR, Tarjetas Globales)
 */

export const DEFAULT_WOMPI_CHECKOUT_URL = 'https://checkout.wompi.co/l/VPOS_ijlMeE';
export const DEFAULT_PAYPAL_URL = 'https://paypal.me/Blacktechsec';

export interface PaymentGatewayConfig {
  wompiUrl: string;
  paypalUrl: string;
  name: string;
  supportedMethods: {
    id: string;
    name: string;
    label: string;
    description: string;
  }[];
}

export const paymentGatewayConfig: PaymentGatewayConfig = {
  wompiUrl: DEFAULT_WOMPI_CHECKOUT_URL,
  paypalUrl: DEFAULT_PAYPAL_URL,
  name: 'Zocay Project Gateways',
  supportedMethods: [
    {
      id: 'pse',
      name: 'PSE',
      label: 'PSE',
      description: 'Débito desde cualquier cuenta corriente o de ahorros en Colombia',
    },
    {
      id: 'nequi',
      name: 'Nequi',
      label: 'Nequi',
      description: 'Transferencia directa desde tu cuenta digital Nequi',
    },
    {
      id: 'cards',
      name: 'Tarjetas',
      label: 'Crédito y Débito',
      description: 'Visa, Mastercard y American Express nacionales e internacionales',
    },
    {
      id: 'bancolombia',
      name: 'Bancolombia',
      label: 'Botón Bancolombia',
      description: 'Pago directo con cuentas y QR Bancolombia',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      label: 'PayPal Internacional',
      description: 'Donaciones internacionales en USD/EUR con tarjeta o cuenta PayPal',
    },
  ],
};

/**
 * Abre el checkout de Wompi de forma segura en una nueva pestaña
 */
export function openWompiCheckout(customUrl?: string): Window | null {
  const targetUrl = customUrl && customUrl.trim().startsWith('http') 
    ? customUrl.trim() 
    : DEFAULT_WOMPI_CHECKOUT_URL;
  return window.open(targetUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Abre la pasarela internacional de PayPal (paypal.me) de forma segura
 * Opcionalmente pre-llena el valor en USD si se especifica
 */
export function openPayPalCheckout(customUrl?: string, amountUSD?: number): Window | null {
  const base = customUrl && customUrl.trim().startsWith('http')
    ? customUrl.trim()
    : DEFAULT_PAYPAL_URL;

  let finalUrl = base;
  if (amountUSD && amountUSD > 0) {
    const cleanBase = base.replace(/\/+$/, '');
    finalUrl = `${cleanBase}/${Math.round(amountUSD)}USD`;
  }

  return window.open(finalUrl, '_blank', 'noopener,noreferrer');
}
