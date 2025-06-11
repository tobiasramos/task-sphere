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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: undefined,
    password: undefined,
  });
  const handleLogin = () => {
    let newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "O email é obrigatório.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Por favor, insira um email válido.";
    }

    if (!password) {
      newErrors.password = "A senha é obrigatória.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      console.log("Email:", email);
      console.log("Senha:", password);
    }
  };

  return (
    <>
      <div className={styles.loginFormContainer}>
        <Image
          src="/img/logo-inicial.png"
          alt="Logo"
          width={480}
          height={400}
          style={{ borderRadius: "8px" }}
        />
        <Form layout="vertical" className={styles.loginForm}>
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

          <div>
            <Link>Esqueceu sua senha?</Link>
          </div>

          <div className={styles.btnContanaier}>
            <Button
              className={styles.btnLogin}
              onClick={handleLogin}
              type="primary"
            >
              Login
            </Button>
            <Link>Não tem acesso? Clique aqui.</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
