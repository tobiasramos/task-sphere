"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { Button, Form, Input } from "antd";
import Link from "antd/es/typography/Link";
import { useState } from "react";
import Image from "next/image";

const isValidEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm = ({ isLogin }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const handleSubmit = () => {
    let newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!email) {
      newErrors.email = "O email é obrigatório.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Por favor, insira um email válido.";
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória.";
    }

    if (!isLogin) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "A confirmação de senha é obrigatória.";
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = "As senhas não coincidem.";
      }
    }

    setErrors(newErrors);

    if (
      !newErrors.email &&
      !newErrors.password &&
      (isLogin || !newErrors.confirmPassword)
    ) {
      const payload = isLogin
        ? { email, password }
        : { email, password, confirmPassword };

      console.log("Enviando dados:", payload);
    }
  };

  return (
    <div className={styles.authFormContainer}>
      <Image
        src="/img/logo-inicial.png"
        alt="Logo"
        width={480}
        height={400}
        style={{ borderRadius: "8px" }}
      />
      <Form layout="vertical" className={styles.authForm}>
        {isLogin ? (
          <p className={styles.inf}>Login</p>
        ) : (
          <p className={styles.inf}>Cadastro</p>
        )}
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email}
        >
          <Input
            placeholder="Digite seu email."
            value={email}
            onChange={(e) => {
              setErrors({ ...errors, email: undefined });
              setEmail(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Senha"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password}
        >
          <Input.Password
            placeholder="Digite sua senha."
            value={password}
            onChange={(e) => {
              setErrors({ ...errors, password: undefined });
              setPassword(e.target.value);
            }}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        {!isLogin && (
          <Form.Item
            label="Confirmar Senha"
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={errors.confirmPassword}
          >
            <Input.Password
              placeholder="Confirme sua senha."
              value={confirmPassword}
              onChange={(e) => {
                setErrors({ ...errors, confirmPassword: undefined });
                setConfirmPassword(e.target.value);
              }}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        )}

        <div>{isLogin ? <Link>Esqueceu sua senha?</Link> : null}</div>

        <div className={styles.btnContainer}>
          <Button
            className={styles.btnAuthForm}
            onClick={handleSubmit}
            type="primary"
          >
            {isLogin ? "Login" : "Cadastrar"}
          </Button>
          {isLogin ? (
            <Link href="/cadastro-usuario">Não tem acesso? Clique aqui.</Link>
          ) : (
            <Link href="/">Voltar ao login.</Link>
          )}
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
