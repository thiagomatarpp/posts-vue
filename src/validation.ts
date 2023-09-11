export interface Status {
    valid: boolean,
    message?: string
}

type Rule = (value: string) => Status

export const required: Rule = (value: string): Status => {
    const result = Boolean(value)
    return {
        valid: result,
        message: result ? undefined : "This field is required"
    }
}

export function length({min, max}:{min: number, max: number}): Rule{
    return function (value: string): Status {
        const result = Boolean(value.length > min && value.length < max)
        return {
            valid: result,
            message: result ? undefined : `This field must be between ${min} and ${max} characters`
        }
    }
}

export function validate(value: string, rules: Rule[]): Status {
    for (const rule of rules) {
        const result = rule(value)
        if (!result.valid) {
            return result
        }
    }

    return {
        valid: true
    }
}

console.log(
    validate('a', [length({min: 5, max: 10})]),
    validate('aaaaaaaaaaaa', [length({min: 5, max: 10})]),
    validate('username', [length({min: 5, max: 10})]),
)