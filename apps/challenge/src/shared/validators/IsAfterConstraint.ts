import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isAfter', async: false })
export class IsAfterConstraint implements ValidatorConstraintInterface {

  /**
   * Check if the DTO property decorate with this class is grater than the property received in the args parameter
   *
   * @param propertyValue
   * @param args
   */
  validate(propertyValue: string, args?: ValidationArguments) {
    return propertyValue > args.object[args.constraints[0]];
  }

  /**
   *
   * @param args
   */
  defaultMessage(args?: ValidationArguments): string {
    return `"${ args.property }" must be after "${ args.constraints[0] }"`;
  }
}
