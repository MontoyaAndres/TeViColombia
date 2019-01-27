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
feedback: Array<IFeedback | null>;
information: IUserInformation | null;
necessity: Array<INecessity | null>;
me: IUser | null;
}

interface IFeedbackOnQueryArguments {
userId: string;
}

interface IInformationOnQueryArguments {
id: string;
}

interface INecessityOnQueryArguments {
userId: string;
}

interface IFeedback {
__typename: "Feedback";
id: string | null;
stars: number | null;
comment: string | null;
user: IUser | null;
}

interface IUser {
__typename: "User";
id: string;
name: string;
lastname: string;
email: string;
routePhoto: string;
}

interface IUserInformation {
__typename: "UserInformation";
id: string | null;
routePhoto: string;
routeCover: string | null;
name: string;
lastname: string;
description: string | null;
identificationDocumentType: string;
identificationDocument: any;
address: string | null;
telephone: any;
departament: string | null;
city: string | null;
nationality: string | null;
civilStatus: string | null;
linkedin: string | null;
skype: string | null;
website: string | null;
gender: string | null;
email: string;
skills: Array<string | null> | null;
language: Array<ILanguage | null> | null;
study: Array<IStudy | null> | null;
work: Array<IWork | null> | null;
cv: Array<ICV | null> | null;
}

interface ILanguage {
__typename: "Language";
id: string | null;
language: string | null;
level: string | null;
}

interface IStudy {
__typename: "Study";
id: string | null;
place: string | null;
level: string | null;
area: string | null;
startedOn: any | null;
finishIn: any | null;
}

interface IWork {
__typename: "Work";
id: string | null;
company: string | null;
job: string | null;
departament: string | null;
sector: string | null;
area: string | null;
goals: string | null;
startedOn: any | null;
finishIn: any | null;
}

interface ICV {
__typename: "CV";
id: string | null;
routeCV: string | null;
}

interface INecessity {
__typename: "Necessity";
id: string | null;
finished: boolean | null;
comment: string | null;
}

interface IMutation {
__typename: "Mutation";
feedback: Array<IError> | null;
deleteFeedback: boolean;
generalInformation: Array<IError> | null;
necessity: boolean;
editNecessity: boolean;
deleteNecessity: boolean;
portafolio: boolean;
editPortafolio: boolean;
deletePortafolio: boolean;
trainingEmployment: boolean;
sendForgotPasswordEmail: boolean | null;
forgotPasswordChange: Array<IError> | null;
login: Array<IError> | null;
logout: boolean | null;
register: Array<IError> | null;
userSettings: Array<IError> | null;
}

interface IFeedbackOnMutationArguments {
id: string;
stars: number;
comment: string;
}

interface IDeleteFeedbackOnMutationArguments {
id: string;
}

interface IGeneralInformationOnMutationArguments {
id?: string | null;
information?: IGeneralInformationInput | null;
}

interface INecessityOnMutationArguments {
finished: boolean;
comment: string;
}

interface IEditNecessityOnMutationArguments {
id: string;
finished: boolean;
comment: string;
}

interface IDeleteNecessityOnMutationArguments {
id: string;
}

interface IPortafolioOnMutationArguments {
multimedia: any;
description: string;
}

interface IEditPortafolioOnMutationArguments {
idPortafolio: string;
multimedia: any;
description: string;
}

interface IDeletePortafolioOnMutationArguments {
idPortafolio: string;
}

interface ITrainingEmploymentOnMutationArguments {
id?: string | null;
information?: ITrainingEmploymentInput | null;
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
telephone: any;
identificationDocumentType: string;
identificationDocument: any;
email: string;
password: string;
}

interface IUserSettingsOnMutationArguments {
email: string;
password?: string | null;
newPassword?: string | null;
}

interface IError {
__typename: "Error";
path: string;
message: string;
}

interface IGeneralInformationInput {
routePhoto?: any | null;
routeCover?: any | null;
name: string;
lastname: string;
description?: string | null;
identificationDocumentType: string;
identificationDocument: any;
address?: string | null;
telephone: any;
departament: string;
city: string;
nationality: string;
civilStatus: string;
linkedin?: string | null;
skype?: string | null;
website?: string | null;
gender: string;
skills?: Array<string | null> | null;
language?: Array<ILanguageInput | null> | null;
}

interface ILanguageInput {
id?: string | null;
language: string;
level: string;
}

interface ITrainingEmploymentInput {
study?: Array<IStudyInput | null> | null;
work?: Array<IWorkInput | null> | null;
cv?: Array<ICVInput | null> | null;
}

interface IStudyInput {
id?: string | null;
place: string;
level: string;
area?: string | null;
startedOn: any;
finishIn?: any | null;
}

interface IWorkInput {
id?: string | null;
company: string;
job: string;
departament: string;
sector: string;
area: string;
goals: string;
startedOn: any;
finishIn?: any | null;
}

interface ICVInput {
id?: string | null;
routeCV: string;
}
}

// tslint:enable
