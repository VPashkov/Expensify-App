import * as OnyxCommon from './OnyxCommon';

type ACHData = {
    /** Step of the setup flow that we are on. Determines which view is presented. */
    currentStep?: string;

    /** Bank account state */
    state?: string;

    /** Bank account ID of the VBA that we are validating is required */
    bankAccountID?: number;
};

type ReimbursementAccount = {
    /** Whether we are loading the data via the API */
    isLoading?: boolean;

    /** A date that indicates the user has been throttled */
    throttledDate?: string;

    /** Additional data for the account in setup */
    achData?: ACHData;

    /** Disable validation button if max attempts exceeded */
    maxAttemptsReached?: boolean;

    /** Alert message to display above submit button */
    error?: string;

    /** Which field needs attention? */
    errorFields?: OnyxCommon.ErrorFields;

    /** Any additional error message to show */
    errors?: Record<string, string>;
};

export default ReimbursementAccount;
