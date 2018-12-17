// tslint:disable
// graphql typescript definitions

export namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
generalInformation: IUserGeneralInformation | null;
me: IUser | null;
}

interface IGeneralInformationOnQueryArguments {
id?: string | null;
}

interface IUserGeneralInformation {
__typename: "UserGeneralInformation";
description: string | null;
indentificationDocumentType: string;
indentificationDocument: number;
address: string | null;
telephone: string;
departament: string | null;
city: string | null;
civilStatus: string | null;
website: string | null;
gender: string | null;
email: string | null;
}

interface IUser {
__typename: "User";
id: string;
routePhoto: string;
routeCover: string | null;
name: string;
lastname: string;
}

interface IMutation {
__typename: "Mutation";
sendForgotPasswordEmail: boolean | null;
forgotPasswordChange: Array<IError> | null;
login: Array<IError> | null;
logout: boolean | null;
register: Array<IError> | null;
}

interface ISendForgotPasswordEmailOnMutationArguments {
email: string;
}

interface IForgotPasswordChangeOnMutationArguments {
newPassword: string;
key: string;
}

interface ILoginOnMutationArguments {
email: string;
password: string;
}

interface IRegisterOnMutationArguments {
name: string;
lastname: string;
telephone: string;
identificationDocumentType: string;
identificationDocument: number;
email: string;
password: string;
}

interface IError {
__typename: "Error";
path: string;
message: string;
}
}

// tslint:enable
