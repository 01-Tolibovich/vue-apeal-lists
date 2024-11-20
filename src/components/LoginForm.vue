<template>
  <div class="login-form">
    <h2 class="title">Авторизация</h2>
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label class="login" for="text">Логин или Телефон</label>
        <input type="text" id="text" v-model="formData.username" @blur="validateLogin"
          :class="{ 'error': errors.username }" />
        <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <div class="password-input">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="formData.password"
            @blur="validatePassword" :class="{ 'error': errors.password }" />
          <button type="button" @click="togglePassword" class="toggle-password">
            {{ showPassword ? 'Скрыть' : 'Показать' }}
          </button>
        </div>
        <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
      </div>
      <button type="submit" :disabled="loading || !isFormValid" class="submit-button">
        {{ loading ? 'Загрузка...' : 'Войти' }}
      </button>
      <div v-if="submitError" class="submit-error">
        {{ submitError }}
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LoginForm',

  data() {
    return {
      formData: {
        username: '',
        password: '',
      },
      errors: {
        username: '',
        password: '',
      },
      showPassword: false,
    };
  },

  computed: {
    ...mapState({
      loading: (state) => state.auth.loading,
      submitError: (state) => state.auth.errorMessage,
    }),

    isFormValid() {
      return (
        this.formData.username &&
        this.formData.password &&
        !this.errors.username &&
        !this.errors.password
      );
    },
  },

  methods: {
    ...mapActions('auth', ['login']),

    validateLogin() {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Международный формат телефона
      const telegramUsernameRegex = /^[a-zA-Z0-9_]{5,32}$/; // От 5 до 32 символов для Telegram

      if (!this.formData.username) {
        this.errors.username = 'Поле обязательно для заполнения';
      } else if (!phoneRegex.test(this.formData.username) && !telegramUsernameRegex.test(this.formData.username)) {
        this.errors.username = 'Введите корректный номер телефона или имя пользователя Telegram';
      } else {
        this.errors.username = '';
      }
    },

    validatePassword() {
      if (!this.formData.password) {
        this.errors.password = 'Пароль обязателен';
      } else if (this.formData.password.length < 6) {
        this.errors.password = 'Пароль должен быть не менее 6 символов';
      } else {
        this.errors.password = '';
      }
    },

    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    async handleSubmit() {
      this.errors.username = !this.formData.username;
      this.errors.password = !this.formData.password;

      if (this.errors.username || this.errors.password) {
        return;
      }

      await this.login(this.formData);
      if (!this.submitError) {
        this.$router.push('/');
      }
    },
  },
};
</script>


<style lang="scss" scoped>
$error-color: #ff4444;
$border-color: #ddd;
$text-gray: #666;

$border-radius: 4px;
$input-padding: 8px;

@mixin input-base {
  width: 100%;
  padding: $input-padding;
  border: none;
  border-bottom: 1px solid $border-color;
  border-radius: $border-radius;
}

@mixin rounded {
  border-radius: 5px;
}

// Styles
.login-form {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0 auto;
  padding: 20px;
  max-width: 340px;
  width: 100%;
  position: relative;
  height: 290px;
  @include rounded;

  .title {
    position: absolute;
    left: 50%;
    top: -10%;
    transform: translateX(-50%);
    background-color: $primary-color;
    width: 90%;
    text-align: center;
    padding: 18px 24px;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    @include rounded;
  }

  form {
    width: 100%;

    .login {
      color: $primary-color !important;
    }
  }
}

.form-group {
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {

    &[type="email"],
    &[type="password"],
    &[type="text"] {
      @include input-base;
    }
  }
}

.error {
  border-color: $error-color;
}

.error-message {
  color: $error-color;
  font-size: 12px;
  margin-top: 5px;
}

.password-input {
  position: relative;

  .toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: $text-gray;
    cursor: pointer;
  }
}

.submit-button {
  width: fit-content;
  display: block;
  margin: 0 auto;
  font-size: 14px;
  padding: 10px 36px;

  &:disabled {
    cursor: not-allowed;
  }
}

.submit-error {
  color: $error-color;
  margin-top: 10px;
  text-align: center;
}
</style>
