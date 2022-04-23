<template>
  <section class="popup popup_type_confirm">
    <div class="popup__form popup__form_type_confirm" name="form">
      <button type="button" class="popup__close" @click="closePopup"></button>
      <h2 class="popup__form-title">{{ popupType.title }}</h2>
      <div class="popup__buttons">
        <button type="submit" class="popup__button" @click="onCancelClick">
          Нет
        </button>
        <button type="submit" class="popup__button" @click="onConfirmClick">
          Да
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "PopupConfirm",
  computed: {
    ...mapState(["popupType"]),
  },
  methods: {
    ...mapActions(["setPopupVisible", "setPopupType"]),
    closePopup() {
      this.setPopupVisible(false);
    },
    onCancelClick() {
      this.popupType.popupFunctionCancel &&
        this.popupType.popupFunctionCancel();
      this.setPopupVisible(false);
    },
    onConfirmClick() {
      this.popupType.popupFunction();
      this.setPopupVisible(false);
    },
  },
};
</script>

<style>
.popup {
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  padding: 10px;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.popup_type_confirm {
  z-index: 2;
}

.popup__form-title {
  text-align: center;
  margin-top: 10px;
}

.popup__form {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: rgb(57, 57, 57);
  color: #ffffff;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  line-height: 17px;
  padding: 14px 36px 36px 36px;
  box-sizing: border-box;
}
.popup__form_type_confirm {
  max-width: 430px;
}

.popup__close {
  width: 22px;
  height: 22px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.3s;
  background-image: url("../assets/icon__close.png");
  background-size: contain;
  margin-left: auto;
}

.popup__buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.popup__button {
  width: 35%;
  color: #ffffff;
  cursor: pointer;
  border: none;
  background-color: rgb(233, 152, 152);
  border-radius: 10px;
  color: rgb(255, 255, 255);
  margin-top: 40px;
  padding: 5px;
  font-size: 18px;
  z-index: 1;
}

@media (max-width: 560px) {
  .popup {
    padding: 0 20px;
    font-size: 14px;
  }
  .popup__close {
    width: 16px;
    height: 16px;
  }
  .popup__button {
    width: 35%;
    font-size: 14px;
  }
}
@media (max-width: 425px) {
  .popup__form {
    padding: 10px 20px 20px 20px;
  }
}
</style>