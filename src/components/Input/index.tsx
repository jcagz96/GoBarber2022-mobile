import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInputCustom, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: object;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input = forwardRef(
  ({ name, icon, containerStyle, ...rest }: InputProps, ref) => {
    const inputElementRef = useRef<any>(null);
    const {
      fieldName,
      registerField,
      defaultValue = '',
      error,
    } = useField(name);
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
      registerField<string>({
        name: fieldName,
        ref: inputValueRef.current,
        path: 'value',
      });
    }, [fieldName, registerField]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputElementRef.current.focus();
      },
    }));

    const handleInputFocus = useCallback(() => {
      setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
      setIsFocused(false);

      if (inputValueRef.current?.value) {
        setIsFilled(true);
      } else {
        setIsFilled(false);
      }
      // ou setIsFilled(!!inputValueRef.current?.value)
    }, []);

    return (
      <Container
        style={containerStyle}
        isFocused={isFocused}
        isErrored={!!error}
      >
        <Icon
          name={icon}
          size={20}
          color={isFilled || isFocused ? '#ff9000' : '#666360'}
        />
        <TextInputCustom
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor="#666360"
          defaultValue={defaultValue}
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          onChangeText={(value) => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />
      </Container>
    );
  },
);

Input.defaultProps = {
  containerStyle: {},
};

export default Input;
