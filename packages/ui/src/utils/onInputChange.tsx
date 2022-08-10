export function onInputChange(name: string, value: string, status?: any) {
  switch (name) {
    case "username": {
      if (value.length > 0) {
        const result = checkUsernameValid(value, status);

        return result;
      }
      if (value.length === 0) {
        return {
          is_change: true,
          changeStatus: "default",
          changeHelperText: " ",
        };
      }
    }
    case "id":{
      if (value.length > 0) {
        if (status === "danger") {
          return {
            is_change: true,
            changeStatus: "default",
            changeHelperText: " ",
          };
        }

        return { is_change: false };
      }

      return { is_change: false };
    }

    case "password": {
      if (value.length > 0) {
        if (status === "danger") {
          return {
            is_change: true,
            changeStatus: "default",
            changeHelperText: " ",
          };
        }

        return { is_change: false };
      }

      return { is_change: false };
    }

    case "email": {
      if (value.length > 0) {
        const result = checkEmailValid(value, status);
        console.log("eee")

        return result;
      } 
      if (value.length === 0) {
        return {
          is_change: true,
          changeStatus: "default",
          changeHelperText: "이메일 형식으로 입력해주세요.",
        };
      }
    }

    case "phoneNumber": {
      if (value.length) {
        const result = checkPhoneNumberValid(value, status);

        return result;
      } else {
        return {
          is_change: true,
          changeStatus: "default",
          changeHelperText: "숫자만 입력이 가능합니다.",
        };
      }
    }

    case "customerName": {
      return {
        is_change: true,
        changeStatus: "default",
        changeHelperText: "",
      };
    }

    case "customerCode": {
    }
    case "factoryCode": {
      if (value.length) {
        const result = checkCustomerFactoryCodeValid(value, status);
        return result;
      } else {
        return {
          is_change: true,
          changeStatus: "default",
          changeHelperText: "영문 또는 숫자 사용 3자리 입력",
        };
      }
    }

    case "equipmentCode": {
      if (value.length) {
        const result = checkEquipmentCodeValid(value, status);

        return result;
      } else {
        return {
          is_change: true,
          changeStatus: "default",
          changeHelperText: "영문 대문자 3자리 + 숫자 2자리",
        };
      }
    }

    case "serialNumber": {
      if (value.length == 4) {
        return {
          is_change: true,
          changeStatus: "nice",
          changeHelperText: "So Gentle!",
        };
      } else if (value.length > 0) {
        return {
          is_change: true,
          changeStatus: "danger",
          changeHelperText: "4자리의 숫자로 입력해주세요",
        };
      } else {
        return {
          is_change: true,
          changeStatus: "default",
          changeHelperText: "4자리의 숫자로 입력해주세요",
        };
      }
    }

    case "mac": {
      if (value.length) {
        const result = checkMacAddress(value, status);

        return result;
      } else {
        return {
          is_change: true,
          changeStatus: "default",
          changeHelperText: "12자리의 영문 대문자, 숫자 조합을 입력해주세요.",
        };
      }
    }

    case "factoryVoltage": {
      return {
        is_change: true,
        changeStatus: "default",
        changeHelperText: "숫자만 입력이 가능합니다.",
      }
    }

    default: {
      return {
        is_change: true,
        changeStatus: "default",
        changeHelperText: " ",
      };
    }
  }
}

const checkEmailValid = (value: string, status: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const helperText =
    "올바른 이메일 형식으로 입력해주세요. (예시: gec@gecorp.co)";
  const result = testRegex(value, status, regex, helperText);

  return result;
};

const checkPhoneNumberValid = (value: string, status: string) => {
  const regex = /^[0-9]+$/;
  let helperText;
  let result;
  if (value.length > 11) {
    helperText = "전화번호는 11자리 이하만 가능합니다.";
    result = {
      is_change: true,
      changeStatus: "danger",
      changeHelperText: helperText,
    };
  } else {
    helperText = "숫자만 입력이 가능합니다.";
    result = testRegex(value, status, regex, helperText);
  }

  return result;
};

const checkCustomerFactoryCodeValid = (value: string, status: string) => {
  const regex = /^[A-Z0-9]{3,3}$/;
  const helperText = "영문 또는 숫자 사용 3자리 입력";
  const result = testRegex(value, status, regex, helperText);

  return result;
};

const checkMacAddress = (value: string, status: string) => {
  const regex = /^[A-Z0-9]{12,12}$/;
  const helperText = "12자리의 영문 대문자, 숫자 조합을 입력해주세요.";
  const result = testRegex(value, status, regex, helperText);

  return result;
};

const checkEquipmentCodeValid = (value: string, status: string) => {
  const regex = /^[A-Z]{3,3}[0-9]{2,2}$/;
  const helperText = "영문 대문자 3자리 + 숫자 2자리";
  const result = testRegex(value, status, regex, helperText);

  return result;
};

const checkUsernameValid = (value: string, status: string) => {
  const regex = /^[a-z0-9]{6,20}$/g;
  const helperText = "6~20 자리의 영문 소문자 또는 숫자로 입력해주세요."
  const result = testRegex(value, status, regex, helperText)

  return result;
}

const testRegex = (
  value: string,
  status: string,
  regex: RegExp,
  helperText: string,
) => {
  //유효성 검사 통과 && 상태가 danger인 경우 status를 default로 전환
  if (regex.test(value)) {
    return {
      is_change: true,
      changeStatus: "nice",
      changeHelperText: "So Gentle!",
    };
  }
  //유효성 검사 통과x && 상태가 default인 경우 status를 danger로 전환
  else if ((!regex.test(value) && status === "default") || "nice") {
    return {
      is_change: true,
      changeStatus: "danger",
      changeHelperText: helperText,
    };
  } else {
    return { is_change: false };
  }
};