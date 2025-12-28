
export async function sendConfirmationSms(mobile: string, fullName: string): Promise<boolean> {
  try {
    // Simulate an API call to an SMS gateway
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    return true;
  } catch (error) {
    // We keep error logging for system monitoring
    console.error(`[SMS Service] Failed to send confirmation SMS:`, error);
    return false;
  }
}
