import { useState } from 'react';
import IconCheck from '../assets/icon-components/IconCheck';
import IconX from '../assets/icon-components/IconX';
import { PasswordInput, Progress, Text, Popover, Box, rem } from '@mantine/core';

function PasswordRequirement({ meets, label }) {
    return (
        <Text
            c={meets ? 'teal' : 'red'}
            style={{ display: 'flex', alignItems: 'center' }}
            mt={7}
            size="sm"
        >
            {meets ? (
                <IconCheck style={{ width: rem(14), height: rem(14) }} />
            ) : (
                <IconX style={{ width: rem(14), height: rem(14) }} />
            )}{' '}
            <Box ml={10}>{label}</Box>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Includes number' },
    { re: /[a-z]/, label: 'Includes lowercase letter' },
    { re: /[A-Z]/, label: 'Includes uppercase letter' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export default function PasswordInputWithStrength({
    value: initialValue = '',
    label = 'Your password',
    placeholder = 'Your password',
    mt = 'sm',
    description = '',
    onChange,
    error
}) {
    const [popoverOpened, setPopoverOpened] = useState(false);
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        const newValue = event.currentTarget.value;
        setValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
    ));

    const strength = getStrength(value);
    const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

    return (
        <Popover opened={popoverOpened} position="bottom" width="target" transitionProps={{ transition: 'pop' }}>
            <Popover.Target>
                <div
                    onFocusCapture={() => setPopoverOpened(true)}
                    onBlurCapture={() => setPopoverOpened(false)}
                >
                    <PasswordInput
                        mt={mt}
                        withAsterisk
                        label={label}
                        placeholder={placeholder}
                        description={description}
                        value={value}
                        onChange={handleChange}
                        error={error}
                    />
                </div>
            </Popover.Target>
            <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} mb="xs" />
                <PasswordRequirement label="Includes at least 6 characters" meets={value.length > 5} />
                {checks}
            </Popover.Dropdown>
        </Popover>
    );
}
