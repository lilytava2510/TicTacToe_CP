import * as React from "react";
import { RootState, AppDispatch } from "../../Store";
import { useDispatch, useSelector } from "react-redux";
import { joinGame } from "../../Slices/BoardSlice";

export const Game: React.FC = (props: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleConnect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(joinGame(props.id));
  };

  return (
    <div className="container">
      <div>{props.id}</div>
      <button onClick={handleConnect}>Connect</button>
    </div>
  );
};
