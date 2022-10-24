export type UserAcademicRecordProps = {
  id: string;
  name: string;
  studentNumber: string;
  major: string;
  majorCode: string;
  department: string;
  departmentCode: string;
};

export class UserAcademicRecord implements UserAcademicRecordProps {
  id!: string;
  name!: string;
  studentNumber!: string;
  major!: string;
  majorCode!: string;
  department!: string;
  departmentCode!: string;

  constructor(data: Partial<UserAcademicRecordProps>) {
    this.id = data.id;
    this.name = data.name;
    this.studentNumber = data.studentNumber;
    this.major = data.major;
    this.majorCode = data.majorCode;
    this.department = data.department;
    this.departmentCode = data.departmentCode;
  }
}
