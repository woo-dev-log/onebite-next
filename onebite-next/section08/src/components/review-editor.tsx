"use client";

import { createReviewAciton } from "@/actions/create-review.action";
import style from "@/components/review-editor.module.css";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAciton,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form
        className={style.form_container}
        action={formAction}
      >
        <input type="hidden" name="bookId" value={bookId} />
        <textarea disabled={isPending} required name="content" placeholder="리뷰 내용" />
        <div>
          <input disabled={isPending} required name="author" placeholder="작성자" />
          <button disabled={isPending} type="submit">
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}