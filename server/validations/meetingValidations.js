import MembersClass from "../utils/quota.js";
const totalNumberOfMembers = await MembersClass.loadNumberOfMembers();

class Validators {
  static meetingInputValidation = async (data = {}) => {
    const { meetingTitle, date, attendees, meetingStatusId } = data;
    const errors = [];

    if (
      !meetingTitle ||
      meetingTitle.length === 0 ||
      meetingTitle.trim() === ""
    )
      errors.push("Title cannot be empty!\n");

    if (!date || date.trim() === "") errors.push("Date cannot be empty!\n");

    if (
      attendees === undefined ||
      attendees === null ||
      attendees < 0 ||
      attendees > totalNumberOfMembers
    )
      errors.push(
        `Number of attendees must be between 0 and ${totalNumberOfMembers}!\n`,
      );
    if (
      meetingStatusId === undefined ||
      meetingStatusId === null ||
      meetingStatusId > 4 ||
      meetingStatusId < 1
    )
      errors.push("Meeting status id must be between 1 and 4!\n ");

    return errors;
  };

  static meetingEditingValidation = async (data = {}) => {
    const { meetingTitle, date, attendees, meetingStatusId } = data;
    const errors = [];

    if (meetingTitle)
      if (meetingTitle.length < 1 || meetingTitle.trim() === "")
        errors.push("Meeting title must have at least one character!\n");

    if (meetingStatusId === 1) {
      const today = new Date();
      if (date < today.getFullYear() || date.trim() === "")
        errors.push("Date cannot be in the past or empty.\n");
    }

    if (attendees !== undefined && attendees !== null) {
      if (attendees > totalNumberOfMembers || attendees < 0) {
        errors.push(
          `Number of attendees must be between 0 and ${totalNumberOfMembers}!\n`,
        );
      }
    }

    return errors;
  };

  meetingAgendaValidation = async (input = {}) => {
    const errors = [];

    if (input.trim() === "") errors.push("Agenda content cannot be empty\n");
    return errors;
  };
}

class MeetingValidators extends Validators {
  static dataValidation = async (type, data) => {
    switch (type) {
      case "create":
        return this.meetingInputValidation(data);

      case "update":
        return this.meetingEditingValidation(data);

      case "agenda":
        return this.meetingAgendaValidation(data);

      default:
        return ["INVALID VALIDATION TYPE!"];
    }
  };
}

export default MeetingValidators;
