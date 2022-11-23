import { PasswordValidationRequirement } from 'class-validator-password-check';

export const passwordValidationRule: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};
