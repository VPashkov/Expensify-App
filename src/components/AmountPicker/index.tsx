import React, {forwardRef, useState} from 'react';
import type {ForwardedRef} from 'react';
import {View} from 'react-native';
import MenuItemWithTopDescription from '@components/MenuItemWithTopDescription';
import useStyleUtils from '@hooks/useStyleUtils';
import variables from '@styles/variables';
import CONST from '@src/CONST';
import callOrReturn from '@src/types/utils/callOrReturn';
import AmountSelectorModal from './AmountSelectorModal';
import type {AmountPickerProps} from './types';

function AmountPicker({value, description, title, errorText = '', onInputChange, furtherDetails, rightLabel, ...rest}: AmountPickerProps, forwardedRef: ForwardedRef<View>) {
    const StyleUtils = useStyleUtils();
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    const showPickerModal = () => {
        setIsPickerVisible(true);
    };

    const hidePickerModal = () => {
        setIsPickerVisible(false);
    };

    const updateInput = (updatedValue: string) => {
        if (updatedValue !== value) {
            // We cast the updatedValue to a number and then back to a string to remove any leading zeros and separating commas
            onInputChange?.(String(Number(updatedValue)));
        }
        hidePickerModal();
    };

    const descStyle = !value || value.length === 0 ? StyleUtils.getFontSizeStyle(variables.fontSizeLabel) : null;

    return (
        <View>
            <MenuItemWithTopDescription
                ref={forwardedRef}
                shouldShowRightIcon
                title={callOrReturn(title, value)}
                descriptionTextStyle={descStyle}
                description={description}
                onPress={showPickerModal}
                furtherDetails={furtherDetails}
                brickRoadIndicator={errorText ? CONST.BRICK_ROAD_INDICATOR_STATUS.ERROR : undefined}
                rightLabel={rightLabel}
                errorText={errorText}
            />
            <AmountSelectorModal
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...rest}
                value={value}
                isVisible={isPickerVisible}
                description={description}
                onClose={hidePickerModal}
                onValueSelected={updateInput}
            />
        </View>
    );
}

AmountPicker.displayName = 'AmountPicker';

export default forwardRef(AmountPicker);
