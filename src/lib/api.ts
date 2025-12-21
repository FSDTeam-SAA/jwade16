import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// get all role
export async function getAllRole() {
  try {
    const res = await api.get(`/occupations/titles`);
    return res.data;
  } catch (err) {
    console.error("Error fetching roles:", err);
    throw new Error("Failed to fetch all roles");
  }
}

// post pay-power
export interface PayPowerPayload {
  currentRole: string;
  experience: string;
  location: string;
  compensation: string;
  lastRaise: string;
  negotiateCurrentSalary: string;
  discussTime: string;
  howConfident: string;
  email: string;
}

export async function postPayPower(data: PayPowerPayload) {
  try {
    const res = await api.post(`/user-selection/pay-power`, data);
    return res.data;
  } catch (err) {
    console.error("Error fetching roles:", err);
    throw new Error("Failed to fetch all roles");
  }
}

// checkout page (stripe)
export interface CheckoutSessionPayload {
  userId?: string | null;
  totalAmount: number;
  type?: string;
  cartItems?: { cartId: string }[];
  paymentType?: string;
}

// post checkout session
export async function postCheckoutSession(data: CheckoutSessionPayload) {
  try {
    const res = await api.post(`/payments/stripe/create`, data);
    return res.data;
  } catch (err) {
    console.error("Error fetching roles:", err);
    throw new Error("Failed to fetch all roles");
  }
}

// get full report
export async function getFullReport(score: number) {
  try {
    const res = await api.get(`/paypower?score=${score}`);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching roles:", err);
    throw new Error("Failed to fetch all roles");
  }
}
