export interface ResourcesConfig {
  auth_HTTP_500_SERVER_ERROR:string;  
  auth_HTTP_401_UNAUTHORIZED:string; 
  auth_TransactionInvalid:string; 
  auth_415PasswordBlock:string;
  auth_515TokenBlock:string;
  auth_SessionExpire:string;

  stp1_ModalErrorTitle:string;
  stp1_Transaction_500:string;
  stp1_Products_500:string;
  stp1_Products_204:string;

  cancel_500:string;

  stp2_ModalErrorTitle:string;
  stp2_GenerateOtp_401:string;
  stp2_GenerateOtp_401Lock:string;
  stp2_Transaction_500:string;
  stp2_GenerateOtp_500:string;
  stp2_ValidateOtp_Invalid:string;
  stp2_ValidatekeyInvalid:string;
  stp2_ValidateOtp_500:string;

  stp_Cancel_401_InvalidState:string;

  stp12_InvalidState_MsgLogin:string;

  summary_7_TRX05_Rejected:string;
  summary_7_TRX05_00001_Abandon:string;
  summary_7_TRX05_00008_Limit:string;
  summary_7_TRX05_00010_Fail:string;
  summary_7_TRX05_00011_Founds:string;
  summary_7_TRX05_00015_Incomplete:string;
  summary_7_TRX05_00016_NotAccess:string;

  summary_8_TRX06_Approved:string;
  summary_8_TRX06_ApprovedPending:string;
    
  summary_9_TRX07_Error:string;
 
  session_title:string;
  session_MessageMinutes:string;
  session_MessageOneMinute:string;

  }
  