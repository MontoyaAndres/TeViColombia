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
information: IUserInformation | null;
me: IUser | null;
}

interface IInformationOnQueryArguments {
id?: string | null;
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
civilStatus: string | null;
website: string | null;
gender: string | null;
email: string;
socialnetwork: Array<ISocialNetwork | null> | null;
language: Array<ILanguage | null> | null;
university: Array<IUniversity | null> | null;
secondaryschool: Array<ISecondary | null> | null;
work: Array<IWork | null> | null;
cv: Array<ICV | null> | null;
professionalAptitude: IProfessionalAptitude | null;
feedback: Array<IFeedback | null> | null;
necessity: Array<INecessity | null> | null;
commercialEstablishment: Array<ICommercialEstablishment | null> | null;
}

interface ISocialNetwork {
__typename: "SocialNetwork";
id: string | null;
name: string | null;
url: string | null;
}

interface ILanguage {
__typename: "Language";
id: string | null;
language: string | null;
level: string | null;
}

interface IUniversity {
__typename: "University";
id: string | null;
place: string | null;
startedOn: any | null;
finishIn: any | null;
finished: boolean | null;
especializations: Array<string | null> | null;
attended: string | null;
description: string | null;
}

interface ISecondary {
__typename: "Secondary";
id: string | null;
place: string | null;
startedOn: any | null;
finishIn: any | null;
finished: boolean | null;
description: string | null;
}

interface IWork {
__typename: "Work";
id: string | null;
place: string | null;
job: string | null;
localization: string | null;
description: string | null;
startedOn: any | null;
finishIn: any | null;
finished: boolean | null;
}

interface ICV {
__typename: "CV";
id: string | null;
routeCV: string | null;
}

interface IProfessionalAptitude {
__typename: "ProfessionalAptitude";
id: string | null;
list: Array<string> | null;
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
}

interface INecessity {
__typename: "Necessity";
id: string | null;
finished: boolean | null;
comment: string | null;
}

interface ICommercialEstablishment {
__typename: "CommercialEstablishment";
id: string | null;
name: string | null;
routePhone: string | null;
}

interface IMutation {
__typename: "Mutation";
feedback: Array<IError> | null;
deleteFeedback: boolean;
generalInformation: Array<IError> | null;
information: Array<IError> | null;
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

interface IInformationOnMutationArguments {
id?: string | null;
name: string;
lastname: string;
routePhoto: any;
routeCover?: any | null;
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
description: string;
identificationDocumentType: string;
identificationDocument: any;
address?: string | null;
telephone: any;
departament?: string | null;
city?: string | null;
civilStatus?: string | null;
website?: string | null;
gender?: string | null;
socialnetwork?: Array<ISocialNetworkInput | null> | null;
language?: Array<ILanguageInput | null> | null;
}

interface ISocialNetworkInput {
id?: string | null;
name: string;
url: string;
}

interface ILanguageInput {
id?: string | null;
language: string;
level: string;
}

interface ITrainingEmploymentInput {
university?: Array<IUniversityInput | null> | null;
secondaryschool?: Array<ISecondaryInput | null> | null;
work?: Array<IWorkInput | null> | null;
professionalAptitude?: IProfessionalAptitudeInput | null;
cv?: Array<ICVInput | null> | null;
}

interface IUniversityInput {
id?: string | null;
place: string;
startedOn: any;
finishIn: any;
finished: boolean;
especializations?: Array<string | null> | null;
attended: string;
description: string;
}

interface ISecondaryInput {
id?: string | null;
place: string;
startedOn: any;
finishIn?: any | null;
finished: boolean;
description: string;
}

interface IWorkInput {
id?: string | null;
place: string;
job: string;
localization: string;
description: string;
startedOn: any;
finishIn?: any | null;
finished: boolean;
}

interface IProfessionalAptitudeInput {
id?: string | null;
list?: Array<string> | null;
}

interface ICVInput {
id?: string | null;
routeCV?: string | null;
}
}

// tslint:enable
