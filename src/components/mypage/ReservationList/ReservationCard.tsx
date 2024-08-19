import Button from '@/components/commons/Button';
import Modal from '@/components/commons/Modal';
import { notify } from '@/components/commons/Toast';
import { patchMyReservationStatus } from '@/libs/api/myReservations';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Reservation } from '@trip.zip-api';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type ReservationCardProps = {
  reservation: Reservation;
  onReviewClick: (reservation: Reservation) => void;
};

export default function ReservationCard({
  reservation,
  onReviewClick,
}: ReservationCardProps) {
  const {
    activity: { bannerImageUrl, title },
    id,
    date,
    startTime,
    endTime,
    status,
    totalPrice,
    headCount,
  } = reservation;

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => patchMyReservationStatus(id, 'canceled'),
    onSuccess: () => {
      notify('success', '예약이 취소되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (error: Error) => {
      alert(`예약 취소 중 오류 발생: ${error.message}`);
    },
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const now = new Date();
    const reservationEndTime = new Date(`${date} ${endTime}`);

    if (now > reservationEndTime && status !== 'canceled') {
      setIsExpired(true);
    }
  }, [date, endTime, status]);

  const statusValue = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <>
            {isExpired ? (
              <p className="font-bold text-purple-500">마감 완료</p>
            ) : (
              <p className="font-bold text-custom-blue-200">예약 완료</p>
            )}
          </>
        );
      case 'canceled':
        return <p className="font-bold text-custom-gray-700">예약 취소</p>;
      case 'confirmed':
        return <p className="font-bold text-custom-orange-200">예약 승인</p>;
      case 'declined':
        return <p className="font-bold text-custom-red-200">예약 거절</p>;
      case 'completed':
        return <p className="font-bold text-custom-green-300">체험 완료</p>;
    }
  };

  const statusButton = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <>
            <Modal.Root>
              <Modal.Trigger>
                {isExpired ? (
                  <Button
                    variant="disabledButton"
                    className="max-w-120 rounded-md px-16 py-10"
                  >
                    마감 완료{' '}
                  </Button>
                ) : (
                  <Button
                    variant="inactiveButton"
                    className="max-w-120 rounded-md px-16 py-10"
                  >
                    예약 취소
                  </Button>
                )}
              </Modal.Trigger>
              <Modal.Content>
                <Modal.Description className="text-center">
                  예약을 취소하시겠어요?
                </Modal.Description>
                <Modal.Close onConfirm={() => mutation.mutate()} confirm>
                  확인
                </Modal.Close>
              </Modal.Content>
            </Modal.Root>
          </>
        );
      case 'completed':
        return (
          <Button
            className="max-w-100 rounded-md"
            onClick={() => onReviewClick(reservation)}
          >
            후기 작성
          </Button>
        );
      default:
        return;
    }
  };

  return (
    <div className="relative">
      <div className="dark-border mb-16 flex h-153 max-w-800 gap-20 overflow-hidden rounded-xl shadow-md lg:h-204">
        <Link
          href={`/activity/${id}`}
          className="relative h-full w-128 flex-shrink-0 md:w-156 lg:w-204"
        >
          <Image
            src={bannerImageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
        </Link>
        <div className="flex w-full flex-col justify-between py-10">
          <p className="mb-2 text-gray-600">{statusValue(status)}</p>
          <Link
            href={`/activity/${id}`}
            className="text-2lg-bold lg:text-xl-bold"
          >
            {title}
          </Link>
          <p className="text-gray-600">
            {date} {startTime} - {endTime} ({headCount}명)
          </p>
          <div className="flex items-baseline justify-between pb-10 pr-10 md:pr-20">
            <p className="mb-2 text-md-semibold md:text-xl-semibold">
              ₩{totalPrice.toLocaleString()}
            </p>
            {statusButton(status)}
          </div>
        </div>
      </div>
    </div>
  );
}
