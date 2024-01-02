import type {StackScreenProps} from '@react-navigation/stack';
import Str from 'expensify-common/lib/str';
import React from 'react';
import {withOnyx} from 'react-native-onyx';
import InputWrapper from '@components/Form/InputWrapper';
import type {OnyxEntry} from 'react-native-onyx/lib/types';
import TextInput from '@components/TextInput';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import {parsePhoneNumber} from '@libs/PhoneNumber';
import type {SettingsNavigatorParamList} from '@navigation/types';
import CONST from '@src/CONST';
import ONYXKEYS from '@src/ONYXKEYS';
import ROUTES from '@src/ROUTES';
import type SCREENS from '@src/SCREENS';
import type {GetPhysicalCardForm} from '@src/types/onyx';
import BaseGetPhysicalCard from './BaseGetPhysicalCard';

type OnValidateResult = {
    phoneNumber?: string;
};

type GetPhysicalCardPhoneOnyxProps = {
    /** Draft values used by the get physical card form */
    draftValues: OnyxEntry<GetPhysicalCardForm | undefined>;
};

type GetPhysicalCardPhoneProps = GetPhysicalCardPhoneOnyxProps & StackScreenProps<SettingsNavigatorParamList, typeof SCREENS.SETTINGS.WALLET.CARD_GET_PHYSICAL.ADDRESS>;

function GetPhysicalCardPhone({
    route: {
        params: {domain},
    },
    draftValues,
}: GetPhysicalCardPhoneProps) {
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    const {phoneNumber = ''} = draftValues ?? {};

    const onValidate = (values: OnyxEntry<GetPhysicalCardForm>): OnValidateResult => {
        const {phoneNumber: phoneNumberToValidate = ''} = values ?? {};

        const errors: OnValidateResult = {};

        if (!(parsePhoneNumber(phoneNumberToValidate).possible && Str.isValidPhone(phoneNumberToValidate))) {
            errors.phoneNumber = 'common.error.phoneNumber';
        } else if (!phoneNumberToValidate) {
            errors.phoneNumber = 'common.error.fieldRequired';
        }

        return errors;
    };

    return (
        <BaseGetPhysicalCard
            currentRoute={ROUTES.SETTINGS_WALLET_CARD_GET_PHYSICAL_PHONE.getRoute(domain)}
            domain={domain}
            headline={translate('getPhysicalCard.phoneMessage')}
            submitButtonText={translate('getPhysicalCard.next')}
            title={translate('getPhysicalCard.header')}
            onValidate={onValidate}
        >
            <InputWrapper
                // @ts-expect-error TODO: Remove this once InputWrapper (https://github.com/Expensify/App/issues/25109) is migrated to TypeScript.
                InputComponent={TextInput}
                inputID="phoneNumber"
                name="phoneNumber"
                label={translate('getPhysicalCard.phoneNumber')}
                aria-label={translate('getPhysicalCard.phoneNumber')}
                role={CONST.ROLE.PRESENTATION}
                defaultValue={phoneNumber}
                containerStyles={[styles.mh5]}
                shouldSaveDraft
            />
        </BaseGetPhysicalCard>
    );
}

GetPhysicalCardPhone.displayName = 'GetPhysicalCardPhone';

export default withOnyx<GetPhysicalCardPhoneProps, GetPhysicalCardPhoneOnyxProps>({
    draftValues: {
        key: ONYXKEYS.FORMS.GET_PHYSICAL_CARD_FORM_DRAFT,
    },
})(GetPhysicalCardPhone);
